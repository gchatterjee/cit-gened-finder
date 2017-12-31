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

# constants
CATEGORIES = [url['name'] for url in course_ops.URLS]
ALL = 'all'

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'cit-gened-finder'
app.config['MONGO_URI'] = 'mongodb://app:foo@ds031347.mlab.com:31347/cit-gened-finder'

mongo = PyMongo(app)

@app.route('/gened-classes/<category>', methods=['GET'])
def get_gened_classes(category=None):
    try:
        print(category)
        data = set([])
        for cat in CATEGORIES:
            if category == None or category == cat:
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
            if not label in mongo.db.collection_names():
                mongo.db.create_collection(label)
            else:
                mongo.db.drop_collection(label) # drop the collection
                mongo.db.create_collection(label) # make the collection again
            coll = mongo.db.get_collection(label)
            for num_array in numbers:
                for num in num_array:
                    coll.insert({'number': num})
        return jsonify({'status': 'Courses successfully updated.'}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

@app.route('/all-classes', methods=['GET'])
def get_all_classes():
    try:
        data = set([])
        if not ALL in mongo.db.collection_names():
            mongo.db.create_collection(ALL)
        coll = mongo.db.get_collection(ALL)
        for course in coll.find():
            data.add(course)
        return jsonify({'status': 'Courses successfully retrieved.', 'data': sorted(list(data))}), OK
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

# @app.route('/all-classes', methods=['POST'])
def post_all_classes():
    try:
        course_ops.update_all_classes()
        courses = course_ops.get_all_classes()
        print(type(courses))
        # for cat in courses['data']:
        #     label = cat['category']
        #     numbers = cat['classes']
        #     if not label in mongo.db.collection_names():
        #         mongo.db.create_collection(label)
        #     else:
        #         mongo.db.drop_collection(label) # drop the collection
        #         mongo.db.create_collection(label) # make the collection again
        #     coll = mongo.db.get_collection(label)
        #     for num_array in numbers:
        #         for num in num_array:
        #             coll.insert({'number': num})
        # return jsonify({'status': 'Courses successfully updated.'}), OK
        # return jsonify({'foo':'bar'}), OK
        raise Exception("Unimplemented.")
    except:
        return jsonify({'error': 'The server threw an exception.'}), INTERNAL_SERVER_ERROR

#TODO: This

if __name__ == '__main__':
    app.run(debug=True)
