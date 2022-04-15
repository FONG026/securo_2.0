//constants declation

const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const fs = require('fs')

const cp = require('child_process')

const port = 3000

const urlencodedParser = bodyParser.urlencoded({ extended : false})

const alert = require('alert')

content='Node 808 File created succesfully... :)'




app.set('view engine', 'ejs')



app.use(express.static('public'))
app.use('/css', express.static(__dirname +'public/css'))






const listing =(fileName)=>{
    
    return fs.readdirSync(fileName)
}

app.get('/', (req, res) => {

    res.render('pages/index', {

        title: "Home Page",

    })

})





app.get('/files', (req, res) => {

    res.render('pages/files', {

        myFiles: listing('./'),

        title: 'files views'

    })

})

const crt =(docname)=>{
    if(fs.existsSync(docname)){
         alert('Le dossier existe déja!')
    }
    if(docname==''){
    alert('Veuiller saisir le nom!')    
    }
    else{
    fs.mkdir(docname,err=> {
        if(err){
            throw err;
        }
    })
    }
}

const crt_files=(meinFile)=>{
    fs.writeFile(meinFile,content.trim(),err =>{
        if(err)
        throw err;
        console.log('Fichier créé avec success')
    })
}
app.post('/files', urlencodedParser, (req, res) => {
    const dirTarget = req.body.docname
    if (dirTarget && dirTarget !=""){
    if(dirTarget.split(".").length > 1){
        crt_files(dirTarget)
        res.render('pages/files', {
        myFiles: listing('./'),
        title: 'Contenue'
        })
    }else {
        crt(dirTarget)
        res.render('pages/files', {
        myFiles: listing('./'),
        title: 'Contenue'
        })  
    }
    }
})

const dlt =(docname)=>{
    fs.rmdir(docname,err =>{
        
        if(err){
            throw err;
        }
        alert('Supprimer!')
})}

app.post('/delete', urlencodedParser, (req, res) => {
    const dirTarget = req.body.fileName
    if (dirTarget && dirTarget !=""){
    dlt(dirTarget)
    res.render('pages/files', {
        myFiles: listing('./'),
        title: 'Contenue'
    })
    } 
})


const move = (actualPath, targetPath) => {

    if (fs.existsSync(actualPath)){

        fs.rename(actualPath, targetPath, err=>{

            if(err){

                throw err;

            }

        })

        alert(`Le fichier ${actualPath} a été déplacer avec success!`)

    }else{

        alert('Erreur 808 ')

    }

}

app.post('/move', urlencodedParser, (req, res) => {

    const sujet = req.body.fileName_1

    const target = req.body.fileName_2

    if (sujet && target && sujet !="" && target!=""){

        move(sujet, target)


        res.render('pages/files', {

            myFiles: listing("./"),

            title: 'files views'

        })

    }

})

const runShell = (shellCommand) => {

    if (shellCommand && shellCommand != ""){

        cp.exec(`start cmd.exe /K ${shellCommand}`)

    }

}

app.post('/shell', urlencodedParser, (req, res) => {

    const data = req.body.shell;


    runShell(data)

    res.redirect('/')

})
///////////////////////////
app.listen(port, () => {

    console.log(`App listening at port http://localhost:${port}`)
  
  })