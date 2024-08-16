import React, { useEffect, useRef, useState } from 'react';
import './Counter.css'

export default function NewCounter() {
    const inputHour = useRef();
    const inputMinute = useRef();
    const inputSec = useRef();

    const [hour, setHour] = useState("0");
    const [minute, setMinute] = useState("0");
    const [sec, setSec] = useState("0");
    const [hourn, setHourn] = useState("00");
    const [minuten, setMinuten] = useState("00");
    const [secn, setSecn] = useState("00");
    const [initHourn, setInitHourn] = useState("00");
    const [initMinuten, setInitMinuten] = useState("00");
    const [initSecn, setInitSecn] = useState("00");
   
    const [disable, setDisable] = useState(false);
    const [isRequired, setIsRequired] = useState(false);




    const handleHour = (e) => {
        setDisable(false);
        setHour(() => {


            if (e.target.value <= 0) {
                e.target.value = "";
                return " ";
            }
            else {
                return e.target.value;
            }
        });
    }
    const handleMinute = (e) => {
        setDisable(false);
        setMinute(() => {
            if (e.target.value > 60 || e.target.value <= 0) {
                e.target.value = "";
                return "";
            }
            else {
                return e.target.value;
            }
        });
    }
    const handleSec = (e) => {
        setDisable(false);
        setSec(() => {
            if (e.target.value > 60 || e.target.value <= 0) {
                e.target.value = "";
                return "";
            }
            else {
                return e.target.value;
            }
        });
    }



    let color =secn<=10 && minuten==0 && hourn==0? "red":"blue";
    let totalSec= Math.abs((parseInt(hour) * 3600) + (parseInt(minute) * 60) + parseInt(sec)) - 1;
    let stotalSec;
    let mtotalSec;
    useEffect(() => {



        const func = () => {

            setHourn(() => {

                return (Math.floor(totalSec / 3600)).toString().padStart(2, '0');
            });
            mtotalSec = totalSec % 3600;
            setMinuten(() => {

                return (Math.floor(mtotalSec / 60)).toString().padStart(2, '0');

            });
            stotalSec = totalSec % 60;
            setSecn(() => {

                return (stotalSec).toString().padStart(2, '0');

            });

            if (totalSec <= 0) {
                clearInterval(myInterval);
                setHourn(() => '00');
                setMinuten(() => '00');
                setSecn(() => '00');
            }
            totalSec--;

            console.log(isRequired);
            if (!isRequired) {
                clearInterval(myInterval);
                setHourn(() => hourn);
                setMinuten(() => minuten);
                setSecn(() => secn);
            }

        }
        let myInterval = setInterval(func, 1000);



        return () => clearInterval(myInterval);

    }, [isRequired])



    const handleStartbtn = () => {
        setInitHourn(hour);
        setInitMinuten(minute);
        setInitSecn(sec);
        setIsRequired(() => true);
        setDisable(true);


    }

    const handleStopbtn = () => {
        setDisable(false);
        setIsRequired(() => false);
        setHour(hourn);
        setMinute(minuten);
        setSec(secn);

    }

    const handleResetbtn = () => {
        setIsRequired(() => false);
        setHour('0');
        setMinute('0');
        setSec('0');
        setHourn('00');
        setMinuten('00');
        setSecn('00');
    }

    const handleRestartbtn = () => {
        
        setHour(initHourn);
        setMinute(initMinuten);
        setSec(initSecn);
        totalSec= Math.abs((parseInt(hour) * 3600) + (parseInt(minute) * 60) + parseInt(sec)) - 1;
        setIsRequired(() => true);
       
        

    }



    return (
        <>
            <div className='container'>
                <div className='nextContainer'>
                    <div className='textContainer'>
                        <h1 style={{ color:'#e60aec' }}>Count Down Timer</h1>
                        <div className='set'>
                            <p style={{ marginTop: "0" }}> <h3>set time → </h3> </p>

                            <div className='inputText'>
                                <input className='ipt' type="number" value={hour} onChange={handleHour} ref={inputHour} />
                                <p className='para'>h:</p>
                                <input className='ipt' type="number" value={minute} onChange={handleMinute} ref={inputMinute} />
                                <p className='para'>m:</p>
                                <input className='ipt' type="number" value={sec} onChange={handleSec} ref={inputSec} />
                                <p className='para'>s</p>
                            </div>

                        </div>
                        <p style={{fontSize :"2rem",color:`${color}`}}> {hourn} h:{minuten} m:{secn} s</p>
                    </div>
                    <div className='buttonContainer'>
                        <button onClick={handleStartbtn} >start</button>
                        <button onClick={handleStopbtn}>stop</button>
                        <button onClick={handleResetbtn}>reset</button>
                        <button onClick={handleRestartbtn}>restart</button>

                    </div>
                </div>

            </div>
        </>
    );
}
