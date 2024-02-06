import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'

import axios from "axios";

function Home() {
    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://localhost:5000/getkey")

        const { data: { data } } = await axios.post("http://localhost:5000/payment", {
            amount
        })
        console.log(data)

        const options = {
            key: key,
            amount: data.amount,
            currency: "INR",
            name: "Rajesh kumar",
            description: "Testing of RazorPay",
            image: "https://avatars.githubusercontent.com/u/90591526?v=4",
            order_id: data.id, //change by order id
            callback_url: "http://localhost:5000/payment/paymentverification",
            prefill: {
                name: "Rajesh Kumar",
                email: "rajesh.kumar.ug20@nsut.ac.in",
                contact: "9711330222"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#5252f7"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        // payment failed
        razor.on('payment.failed', function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            axios.post("http://localhost:5000/sendmail")
        })
    } 
    return (
        <Box>
            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>
                <Card amount={15000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
                <Card amount={30000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />
            </Stack>
        </Box>

    )
}

export default Home