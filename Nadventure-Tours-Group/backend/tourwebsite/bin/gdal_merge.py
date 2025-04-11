#!/home/mac-aphid/Desktop/tour-travel-app/backend/tourwebsite/bin/python3

import sys

from osgeo.gdal import deprecation_warn

# import osgeo_utils.gdal_merge as a convenience to use as a script
from osgeo_utils.gdal_merge import *  # noqa
from osgeo_utils.gdal_merge import main

deprecation_warn("gdal_merge")
sys.exit(main(sys.argv))
