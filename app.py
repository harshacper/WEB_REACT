from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db() :
    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);''')
    conn.commit()
    conn.close()

init_db()

@app.route('/notes', methods=['POST', 'GET'])
def notes():
    if request.method == 'POST':
        data = request.get_json()

        if not data or 'name' not in data:
            return jsonify({'error': 'Name is required!'}), 400
        name = data['name']

        conn = sqlite3.connect('notes.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO names (name) VALUES (?)', (name,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Name added successfully!'}), 201

    elif request.method == 'GET':
        conn = sqlite3.connect('notes.db')
        cursor = conn.cursor()
        cursor.execute('SELECT id, name FROM names')
        rows = cursor.fetchall()
        conn.close()

        names = [{'id': row[0], 'name': row[1]} for row in rows]
        return jsonify(names), 200

@app.route('/notes/<int:name_id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()

    if not data or 'name' not in data:
        return jsonify({'error': 'Name is required!'}), 400
    name = data['name']

    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE names SET name = ? WHERE id = ?', (name, id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Name updated successfully!'}), 200
    
@app.route('/notes/<int:name_id>', methods=['DELETE'])
def delete_note(id):
    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM names WHERE id = ?', (id,))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Name not found!'}), 404
    
    conn.close()
    return jsonify({'message': 'Name deleted successfully!'}), 200  
    
if  __name__ == "__main__":
    app.run(debug=True)