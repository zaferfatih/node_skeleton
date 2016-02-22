module.exports.with = function(app, db, mongoose) {
	var Schema = mongoose.Schema;
	var ObjectId = mongoose.Schema.Types.ObjectId;

	var goalSchema = new Schema({
		name: String,
		updatedBy: {type:ObjectId},
		updatedAt: { type: Date, default: Date.now }
	});

	mongoose.model("Goal", goalSchema);
	var Goal = mongoose.model("Goal");
	//doc
	//var Goal = db.model('Goal', goalSchema);

	//get all
	app.get('/goals', function(req, res){
        Goal.find({},'_id name updatedAt',function (err, docs) {
            res.json({ goals: docs })
        });
	});

	//get by id
	app.get('/goals/:id', function(req, res){
        Goal.findById(req.params.id, '_id name updatedAt',function (err, doc){
            res.json({ goals: doc })
        });
	});

	//insert a product
	app.post('/goals', function (req, res){
        var goal;
        console.log("POST: ");
        console.log(req.body);
        goal = new Goal({
            name: req.body.name,
            updatedBy: req.body.updatedBy,
            updatedAt: new Date()
        });
        goal.save(function (err) {
            if (!err) {
              console.log("created");
            } else {
              console.log(err);
            }
        });
        return res.json({ goals: goal });
	});

	//update by id
	app.put('/goals/:id', function (req, res){
	  return Goal.findById(req.params.id, function (err, goal) {
	    goal.name = req.body.name;
	    goal.updatedAt = new Date();
	    goal.updatedBy = req.body.updatedBy;
	    return goal.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.json({ goals: goal });
	    });
	  });
	});

	//delete
	app.delete('/goals/:id', function (req, res){
	  return Goal.findById(req.params.id, function (err, goal) {
	    return goal.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.json({ goals: '' });
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});
}
