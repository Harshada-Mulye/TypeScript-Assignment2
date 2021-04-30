import express, { Request, Response } from 'express'
const app = express()
const PORT = process.env.PORT || 1337

import { Fruit } from '../types/fruits';

console.log("Debugg1")

let dataFromApi: Fruit[] = [
	{ name: 'Mango', score: 5 },
	{ name: 'Orange', score: 4 }
]

let visitor_count:number = 0;  

var numlist:number[] = [2,4,6,8];

let sum:number=0;

app.get('/', (req: Request, res: Response) => {
	console.log('GET /');
	res.send('This server was built using TypeScript')
})

app.get('/Guestbook', (req: Request, res: Response) => {
	console.log('Get/Guestbook')
	visitor_count++;
	res.status(200).send(`you are visitor number ${visitor_count}`)
})

app.get('/Sum', (req: Request, res: Response) => {
	
	console.log('GET /Sum');
	numlist.forEach(num=>{
    sum=sum+num;
	})
	//res.send(numlist.reduce((a, b) => a + b, 0))
	//let sumAsString:String=String(sum)
	

//res.send(sumAsString)
res.send(""+sum)
	console.log(sum)
})

app.get('/fruits', (req: Request, res: Response) => {
	res.send(dataFromApi)
})

app.get('/fruits/:index',(req:Request,res:Response)=>{
	//console.log('GET /fruits/' ,req.params.index);
	console.log('1')
	
	const index=Number(req.params.index)
	const value=dataFromApi[index]
	if(!value){
		const random = Math.floor(Math.random() * dataFromApi.length)
		res.status(400).send(dataFromApi[random])
		//res.send(dataFromApi[2])
		return
	}
	res.send(value)
})

app.post('/fruits/',(req:Request,res:Response)=>{
	console.log('POST /fruits/', req.body);
	//let newAnimal={species:"rabbit",favouritefood:"carrot"}
	let newFruit=req.body
	dataFromApi.push(newFruit)
	res.send('added new Fruit')
})
/*app.delete('fruits/:index',  (req, res) => {
	const index=Number(req.params.index)
	const value=dataFromApi[index]
	if(!value){
		res.status(400).send("no animal with that index")
		return
	}
    const dataFromApiIndex = dataFromApi.findIndex(p => p.index == index);
   dataFromApi.splice(dataFromApiIndex, 1);
   return res.send();
   });*/
app.listen(PORT, () => {
	console.log('Server is listening on port ' + PORT);
})