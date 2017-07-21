
import os,sys
sys.path.append('/home/dk/mysite')

os.environ["DJANGO_SETTINGS_MODULE"] = "mysite.settings" 
 
from django.core.wsgi import get_wsgi_application
application=get_wsgi_application()
