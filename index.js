let express = require(`express`)
let request = require('request');
let app = express()

let port = 3003
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

app.use(express.static(`public`))
app.use(express.json())

const hbs = require(`hbs`)
app.set(`views`, `views`)
app.set('view engine','hbs')

app.use(express.urlencoded({ extended: true }))

app.get(`/`, async function (req, res) {
    const response = await fetch(`http://localhost:3000/suidaQuestAPI/getAllQuests`);
    const data = await response.json();
    res.render(`index`,{
        quests: data 
    })
})

app.get(`/newQuest`, async function (req, res) {
    res.render(`newQuest`)
})

app.post(`/newQuest`, async function (req, res) {
    const questName = req.body.questName
    const questDescription = req.body.questDescription
    const questPoints = req.body.questPoints
    const response = await fetch("http://localhost:3000/suidaQuestAPI/postQuest", {method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
        JSON.stringify({
            questName: questName,
            questDescription: questDescription,
            questPoints: Number(questPoints)
        })
    })
    res.redirect(`/`)
})

app.get(`/editQuest`, async function (req, res) {
    const response = await fetch(`http://localhost:3000/suidaQuestAPI/getOneQuest/${req.query.id}`);
    const data = await response.json();
    res.render(`editQuest`,{
        quest: data
    })
})

app.post(`/editQuestInfo`, async function (req, res) {
    const questID = req.body.questID
    const questName = req.body.questName
    const questDescription = req.body.questDescription
    const questPoints = req.body.questPoints
    const response = await fetch(`http://localhost:3000/suidaQuestAPI/updateQuest/${questID}`, {method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
        JSON.stringify({
            questName: questName,
            questDescription: questDescription,
            questPoints: Number(questPoints)
        })
    })
    res.redirect(`/editQuest?id=${questID}`)
})