import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from './graphql/query';
import { ADD_USER } from './graphql/mutation';
import TablaMongo from './components/Table';
import "./style/page.css";

function App() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [addUser] = useMutation(ADD_USER);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    correo: '',
    edad: '',
    intereses: '',
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const usuarios = data?.getAllUser || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const interesesArray = formData.intereses
      ? formData.intereses.split(',').map(i => i.trim()).filter(i => i.length > 0)
      : [];

    try {
      await addUser({
        variables: {
          data: {
            nombre: formData.nombre || null,
            correo: formData.correo || null,
            edad: formData.edad ? parseInt(formData.edad) : null,
            intereses: interesesArray.length > 0 ? interesesArray : null,
          }
        }
      });

      setFormData({ nombre: '', correo: '', edad: '', intereses: '' });
      setShowForm(false);

      refetch();
    } catch (err) {
      console.error('Error al agregar usuario:', err);
    }
  };

  return (
    <>
      <title>Ing. Datos</title>
      <div className='titulo'>
        <h1>Registro</h1>
      </div>

      <div className='contenedor'>
        <div className='selector'>
          <button onClick={() => setShowForm(!showForm)}>Agregar</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={handleChange}
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
            />
            <input
              type="text"
              name="intereses"
              placeholder="Intereses (separados por coma)"
              value={formData.intereses}
              onChange={handleChange}
            />
            <button type="submit">Guardar</button>
          </form>
        )}

        <div>
          <TablaMongo usuarios={usuarios} refetch={refetch} />
        </div>
      </div>

      <div className='matrix'></div>
    </>
  );
}

export default App;
