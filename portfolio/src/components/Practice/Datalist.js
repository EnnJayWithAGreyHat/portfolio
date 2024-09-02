import { useState } from 'react';
import styled from "styled-components";
import './Datalist.css'
export default function Datalist() {
    const [value, setValue] = useState(50);
    const handleChange = (e) => {
        console.log(43);
        const value = e.target.value;
        setValue(value);
    }
    const FancyOutput = styled.output`
    
    color:rgb(0, ${props => 2*props.$value}, 255);
    position:absolute;
    left: ${props => props.$value/100*128.99-20}px;
    top: 228px;
    `;
    

    return (
        <div className='testDiv'>
                    <input type="range" list="datalist" id="example" className='work' onChange={handleChange} />
                    <datalist id="datalist" for="example">
                        <option>0</option>
                        <option>20</option>
                        <option>40</option>
                        <option>60</option>
                        <option>80</option>
                        <option>100</option>
                    </datalist><FancyOutput $value = {value}>{value}</FancyOutput>
                </div>
  )};