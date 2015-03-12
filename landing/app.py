from google.appengine.ext.webapp import template
import webapp2
import os


class MainHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'main.html')
    self.response.out.write(template.render(path, template_values))


class RSVPHandler(webapp2.RequestHandler):
  def getShard(self):
    from lib import shards
    return shards.Integer.getOrCreate('rsvp')
  def post(self):
    self.getShard().run('add', 1)
  def get(self):
    self.response.out.write(self.getShard().getValue())


app = webapp2.WSGIApplication([
                ('/rsvp/?', RSVPHandler),
                ('/.*', MainHandler)
              ], debug=True)