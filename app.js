const { ProductManager } = require('./ProductManager/ProductManager')
const products = new ProductManager();
const express = require('express')
// import express from 'express'

const app = express()
app.use(express.urlencoded({ extended: true }));
app.get('/products', async (request, response)=>{
    try{
    let limit = request.query.limit
    const getproducts = await products.getProducts()
    if(limit == null){
        response.send(getproducts)
    }else{
        response.send(getproducts.slice(0,limit))
    }
    
    }
    catch (error){
        console.log(error)
    }
})

app.get('/products/:pid', async (request, response)=>{
    try{
        const id =Number( request.params.pid)
        const getproductsbyid = await products.getProductById(id)
        if (getproductsbyid == 'Not found') return response.send({error:"Product not found"})
        response.send(getproductsbyid)
    }
    catch(error){
        console.log(error)
    }
})

app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})