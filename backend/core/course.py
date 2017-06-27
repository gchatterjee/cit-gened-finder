class Course(object):
    """A course"""

    def __init__(self, number   = None,
                       name     = None,
                       units    = None,
                       desc     = None,
                       prereqs  = None,
                       coreqs   = None,
                       lectures = None,
                       section  = None):
        self.number   = number
        self.name     = name
        self.units    = units
        self.desc     = desc
        self.prereqs  = prereqs
        self.coreqs   = coreqs
        self.lectures = lectures
        self.sections = sections
