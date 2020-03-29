import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import './styles.css';

import api from '../../services/api'
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    

    useEffect(() => {
        api.get('profile', {
            headers : {
                authorization : ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]); 

    async function handleDeleteincidente(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers : {
                    authorization : ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRICÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteincidente(incident.id)}type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
               ))}
                
            </ul>
        </div>
    );
}