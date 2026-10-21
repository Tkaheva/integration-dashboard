from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
import random
import time

app = Flask(__name__)
CORS(app)

# In-memory "база"
RECORDS = [
    {
        "id": str(uuid.uuid4()),
        "name": f"Интеграция #{i}",
        "status": random.choice(["active", "error", "pending"]),
        "type": random.choice(["ozon", "google_sheets", "webhook"]),
        "updated_at": "2026-10-20T10:00:00Z",
    }
    for i in range(1, 51)
]

@app.get("/api/records")
def list_records():
    time.sleep(0.3)  # имитация сети
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    search = request.args.get("search", "").lower()
    status = request.args.get("status", "")

    filtered = RECORDS
    if search:
        filtered = [r for r in filtered if search in r["name"].lower()]
    if status:
        filtered = [r for r in filtered if r["status"] == status]

    total = len(filtered)
    start = (page - 1) * limit
    items = filtered[start:start + limit]
    return jsonify({"items": items, "total": total, "page": page, "limit": limit})

@app.post("/api/records")
def create_record():
    data = request.get_json()
    record = {
        "id": str(uuid.uuid4()),
        "name": data["name"],
        "status": data.get("status", "pending"),
        "type": data.get("type", "webhook"),
        "updated_at": "2026-10-21T10:00:00Z",
    }
    RECORDS.insert(0, record)
    return jsonify(record), 201

@app.put("/api/records/<record_id>")
def update_record(record_id):
    data = request.get_json()
    for r in RECORDS:
        if r["id"] == record_id:
            r.update({k: v for k, v in data.items() if k in ("name", "status", "type")})
            r["updated_at"] = "2026-10-21T12:00:00Z"
            return jsonify(r)
    return jsonify({"error": "Not found"}), 404

@app.delete("/api/records/<record_id>")
def delete_record(record_id):
    global RECORDS
    RECORDS = [r for r in RECORDS if r["id"] != record_id]
    return "", 204

if __name__ == "__main__":
    app.run(port=5000, debug=True)