from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

import course_ops
import time

# ERROR CODES
OK = 200

BAD_REQUEST = 400
AUTHORIZATION_REQUIRED = 401
FORBIDDEN = 403
NOT_FOUND = 404

INTERNAL_SERVER_ERROR = 500

# constants
CATEGORIES = [url['name'] for url in course_ops.URLS]
ALL = 'all'
UPDATES = 'updates'

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'cit-gened-finder'
app.config['MONGO_URI'] = 'mongodb://app:foo@ds031347.mlab.com:31347/cit-gened-finder'

mongo = PyMongo(app)

@app.route('/gened-classes/<category>', methods=['GET'])
def get_gened_classes(category=None):
    if((category not in CATEGORIES) and category != ALL):
        return jsonify({'status': 'Invalid category.'}), BAD_REQUEST
    try:
        data = set([])
        for cat in CATEGORIES:
            if category == ALL or category == cat:
                if not cat in mongo.db.collection_names():
                    mongo.db.create_collection(cat)
                coll = mongo.db.get_collection(cat)
                for ns in coll.find(): data.add(ns['number'])
        return jsonify({'status': 'Courses succesfully retrieved.', 'data': sorted(list(data))}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/gened-classes', methods=['POST'])
def post_gened_classes():
    try:
        course_ops.update_gened_classes()
        courses = course_ops.get_gened_classes()
        for cat in courses['data']:
            label = cat['category']
            numbers = cat['classes']
            if label in mongo.db.collection_names():
                mongo.db.drop_collection(label) # drop the collection
            mongo.db.create_collection(label) # make the collection again
            coll = mongo.db.get_collection(label)
            for num_array in numbers:
                for num in num_array:
                    coll.insert({'number': num})
        return jsonify({'status': 'Courses successfully updated.'}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/existing-gened-classes/<category>', methods=['GET'])
def get_existing_gened_classes(category=None):
    if(not (category in CATEGORIES)): return jsonify({'status': 'Invalid category.'}), BAD_REQUEST
    try:
        existing_coll_name = category + '-existing'
        if not ((existing_coll_name) in mongo.db.collection_names()):
            mongo.db.create_collection(existing_coll_name)
        coll = mongo.db.get_collection(existing_coll_name)
        data = []
        for course in coll.find():
            datum = dict(course)
            datum.pop('_id', None)
            data.append(datum)
        return jsonify({'status': 'Courses successfully retrieved', 'data': data}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/existing-gened-classes/<category>', methods=['POST'])
def post_existing_gened_classes(category=None):
    if(not (category in CATEGORIES)): return jsonify({'status': 'Invalid category.'}), BAD_REQUEST
    try:
        # get the gened classes
        gened_data = set([])
        if not (category in mongo.db.collection_names()):
            mongo.db.create_collection(category)
        gened_coll = mongo.db.get_collection(category)
        for ns in gened_coll.find(): gened_data.add(ns['number'])

        # # get all the classes
        if not ALL in mongo.db.collection_names():
            mongo.db.create_collection(ALL)
        all_coll = mongo.db.get_collection(ALL)

        data = all_coll.find({"number": {"$in": list(gened_data)}})

        existing_coll_name = category + '-existing'
        if (existing_coll_name) in mongo.db.collection_names():
            mongo.db.drop_collection(existing_coll_name)
        mongo.db.create_collection(existing_coll_name)
        existing_coll = mongo.db.get_collection(existing_coll_name)
        for course in data:
            existing_coll.insert(course)

        return jsonify({'status': 'Courses successfully updated'}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/all-classes', methods=['GET'])
def get_all_classes():
    try:
        data = []
        if not ALL in mongo.db.collection_names():
            mongo.db.create_collection(ALL)
        coll = mongo.db.get_collection(ALL)
        for obj in coll.find():
            datum = dict(obj)
            datum.pop('_id', None)
            data.append(datum)
        return jsonify({'status': 'Courses successfully retrieved.', 'data': data}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/all-classes', methods=['POST'])
def post_all_classes():
    try:
        course_ops.update_all_classes()
        data = course_ops.get_all_classes()
        courses = data['courses']
        if ALL in mongo.db.collection_names():
            mongo.db.drop_collection(ALL)
        mongo.db.create_collection(ALL)
        coll = mongo.db.get_collection(ALL)
        for course in courses:
            coll.insert(course)
        return jsonify({'status': 'Courses successfully updated.'}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

if __name__ == '__main__':
    app.run(debug=True)
