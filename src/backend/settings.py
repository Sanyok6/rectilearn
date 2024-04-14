from distutils.util import strtobool
from dotenv import load_dotenv
import os

load_dotenv()

PRODUCTION = strtobool(os.getenv("PRODUCTION"))
USE_RAILWAY = strtobool(os.getenv("USE_RAILWAY"))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_WEEKS = 15
USE_LOCAL_PG = strtobool(os.getenv("USE_LOCAL_PG"))

# Database
POSTGRESQL_URI = os.getenv("POSTGRESQL_URI")

PROFILE_PICTURE_INDEXES = (0, 1, 2, 3)
