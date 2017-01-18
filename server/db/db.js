var knex = require('knex')({
	client : 'mysql',
	connection : {
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_PORT 
  }
});

knex.schema.hasTable('users').then(function(exists) {
	if (!exists) {
		knex.schema.createTable('users', function(user) {
			user.increments('id').primary();
			user.string('username', 100).unique();
			user.string('email', 100).unique();
			user.string('password', 100);
      user.string('picture', 150);
      user.string('first', 100);
      user.string('last', 100);
      user.string('phone', 100);
      user.string('about', 10000);
      user.string('github', 1000);
      user.string('facebook', 1000);
      user.string('twitter', 1000);
      user.string('linkedin', 1000);
      user.integer('admin');
			user.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		})
	}
});

knex.schema.hasTable('channel').then(function(exists) {
 if (!exists) {
   knex.schema.createTable('channel', function(channel) {
     channel.increments('id').primary();
     channel.string('name', 100).unique();
     channel.timestamps();
   }).then(function (table) {
     console.log('Created Table', table);
   })
 }
});

knex.schema.hasTable('channel_messages').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('channel_messages', function(channel_messages) {
      channel_messages.increments('id').primary();
      channel_messages.integer('userID').unsigned().references('users.id');
      channel_messages.integer('channelID').unsigned().references('channel.id');
      channel_messages.string('message', 500);
      channel_messages.string('url', 150);
      channel_messages.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    })
  }
});

knex.schema.hasTable('channel_users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('channel_users', function(channel_users) {
      channel_users.increments('id').primary();
      channel_users.integer('userID').unsigned().references('users.id');
      channel_users.integer('channelID').unsigned().references('channel.id');
      channel_users.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    })
  }
});

knex.schema.hasTable('DM_room').then(function(exists) {
 if (!exists) {
   knex.schema.createTable('DM_room', function(DM_room) {
     DM_room.increments('id').primary();
     DM_room.integer('user1', 100).unsigned().references('users.id');
     DM_room.integer('user2', 100).unsigned().references('users.id');
     DM_room.string('channelName', 100).unique();    
     DM_room.string('aliasName', 100).unique();   
     DM_room.timestamps();
   }).then(function (table) {
     console.log('Created Table for DM_rooms', table);
   })
 }
});

knex.schema.hasTable('DM_messages').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('DM_messages', function(DM_messages) {
      DM_messages.increments('id').primary();
      DM_messages.integer('authorID').unsigned().references('users.id');
      DM_messages.integer('DM_roomID').unsigned().references('DM_room.id');
      DM_messages.string('message', 500);
      DM_messages.string('url', 150);
      DM_messages.timestamps();
    }).then(function (table) {
      console.log('Created Table for DM messages', table);
    })
  }
});

module.exports = knex;



