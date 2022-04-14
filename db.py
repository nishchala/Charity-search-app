
import json
from index import Index


class Database:
    def __init__(self, path):
        self.index = Index(path)
        data = self.index.is_empty()
        if data:
            file = open('C:/Users/nijoj/Desktop/a4/dev/orgs.json')
            content = json.load(file)
            self.index.populate(content, 'mission')

    def get_results(self, content):
        return self.index.search(content, 'mission')

    def get_id(self, context):
        return self.index.get(uid=context)

    def get_mission(self, content, id):
        return self.index.search(content, 'mission', join='or', avoid={'uid': id})
