import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Importar esto para evitar problemas con chart.js
import '../App.css';

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);

    // Función para obtener los docentes
    const obtenerDocentes = async () => {
        const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
        const data = await response.json();
        setDocentes(data);
    };

    useEffect(() => {
        // Llamar a la función obtenerDocentes cada 5 segundos (5000 ms)
        const intervalId = setInterval(() => {
            obtenerDocentes();
        }, 2000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []);

    // Agrupar y contar docentes por sexo
    const contarPorSexo = () => {
        const conteo = { Masculino: 0, Femenino: 0 };

        docentes.forEach(docente => {
            if (docente.sexo === 'Masculino') {
                conteo.Masculino += 1;
            } else if (docente.sexo === 'Femenino') {
                conteo.Femenino += 1;
            }
        });

        return conteo;
    };

    const conteoSexo = contarPorSexo();

    // Datos para la gráfica de sexo
    const dataSexo = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                label: 'Número de Docentes por Sexo',
                data: [conteoSexo.Masculino, conteoSexo.Femenino],
                backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2
            }
        ]
    };

    return (
        <div>
            <h1 className="App App-link">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>

            {/* Mostrar una tabla con todos los docentes */}
            <table className="docente-table" style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Telefono</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sexo</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{docente.id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{docente.nombre}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{docente.telefono}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{docente.sexo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Gráfica de sexo */}
            <div style={{ width: '600px', margin: '50px auto' }}>
                <h2>Gráfica de Sexo de los Docentes</h2>
                <Bar data={dataSexo} />
            </div>
        </div>
    );
};

export default ListaDocentes;



