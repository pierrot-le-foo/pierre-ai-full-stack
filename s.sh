curl -H Content-Type:application/json --data '{"file": "src/skills.json","name":"Pierre Drouillet Skills","description":"List of skills from Pierre Drouillet, with the following schema:\ntitle: The name of the skill\ncategory: The type of skill\nStars: Rating of the skill, 0 being not very skilled, 5 very being skilled"}' http://localhost:3000/api/documents