import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../../styles/components/Dasboard/grafico.scss";

export default function Grafico(props:any) {

  const [widthMobile, setWidthMobile]= useState(false);
  const [dados, setdados] = useState(false)


  function checksMobile(){
    const mobile = window.screen.width;
    if(mobile < 768){
      setWidthMobile(true)
    }
  }
  

  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  useEffect(()=>{
    checksMobile();
  },[widthMobile])

  useEffect(()=>{
    setTimeout(()=> {
      setdados(true)
    },200)
  },[])

  return (
    
    <>
    {dados && (
      <div className="card m-3">
      <div className="card-body">
        <h4 className="card-title">{props.heading}</h4>
        <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
          <div className="graf"  >
            {widthMobile ? (
              <ResponsiveContainer width={200} height={200}>
              <PieChart >
                <Pie
                  data={props.dados}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"

                >
                  {props.dados.map((entry:any, index:any) => (
                    <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            ):(

              <PieChart width={400} height={400} >
                <Pie
                  data={props.dados}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {props.dados.map((entry:any, index:any) => (
                    <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            )}
            
            
              
          
          
          </div>
          <div className="legends">
            <div className="content ">
                <div className="colorIcon">
                  {props.colors.map((color:any,index:any)=> (
                    <><div className="icon" key={index} style={{backgroundColor: `${color}`}}></div></>
                  ))}
                </div>
                <div className="name-legend">
                  {props.dados.map((dado:any,index:any)=>( 
                    <><span key={dado.value}> {dado.name} {"("+dado.value+")"}</span></>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-end">
              <p>Total: <strong>{props.total}</strong></p> 
          </div>
        
      </div>
      </div>
    )}
     
    </>
    
  );
}