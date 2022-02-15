from flask.cli import AppGroup
from .users import seed_users, undo_users
from .maps import seed_maps, undo_maps
from .feature_types import seed_feature_types, undo_feature_types
# from .feature import seed_features, undo_features

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_maps()
    seed_feature_types()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_maps()
    undo_feature_types()
    # Add other undo functions here
