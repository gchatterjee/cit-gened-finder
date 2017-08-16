from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

import course_ops

# ERROR CODES
OK = 200

BAD_REQUEST = 400
AUTHORIZATION_REQUIRED = 401
FORBIDDEN = 403
NOT_FOUND = 404

INTERNAL_SERVER_ERROR = 500

# RESOURCES
CATEGORIES = [url['name'] for url in course_ops.URLS]

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'cit-gened-finder'
app.config['MONGO_URI'] = 'mongodb://app:foo@ds031347.mlab.com:31347/cit-gened-finder'

mongo = PyMongo(app)

@app.route('/gened-classes', methods=['GET'])
def get_gened_classes():
    try:
        data = []
        for cat in CATEGORIES:
            if not cat in mongo.db.collection_names():
                mongo.db.create_collection(cat)
            coll = mongo.db.get_collection(cat)
            for ns in coll.find():
                print(ns)
                data.append(ns['number'])
        return jsonify({'data': data}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/gened-classes', methods=['PUT'])
def put_gened_classes():
    course_ops.update_gened_classes()
    courses = course_ops.get_gened_classes()
    for cat in courses['data']:
        label = cat['category']
        numbers = cat['classes']
        if not label in mongo.db.collection_names():
            mongo.db.create_collection(label)
        coll = mongo.db.get_collection(label)
        for num_array in numbers:
            for num in num_array:
                coll.insert({'number': num})

@app.route('/all-classes', methods=['GET'])
def get_one_star(name):
    star = mongo.db.stars
    s = star.find_one({'name' : name})
    if s:
        pass
    else:
        output = "No such name"
    return jsonify({'result' : output})

@app.route('/star', methods=['POST'])
def add_star():
    star = mongo.db.stars
    name = request.json['name']
    distance = request.json['distance']
    star_id = star.insert({'name': name, 'distance': distance})
    new_star = star.find_one({'_id': star_id })
    output = {'name' : new_star['name'], 'distance' : new_star['distance']}
    return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(debug=True)
