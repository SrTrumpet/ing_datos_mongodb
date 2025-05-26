import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER, UPDATE_USER} from "../graphql/mutation";
import "../style/table.css";

const TablaMongo = ({ usuarios, refetchUsuarios }) => {
    const [filaExpandida, setFilaExpandida] = useState(null);
    const [filaEditando, setFilaEditando] = useState(null);
    const [formulario, setFormulario] = useState({
        id: "",
        nombre: "",
        correo: "",
        edad: 0,
        intereses: [],
    });

    const [deleteUser] = useMutation(DELETE_USER);
    const [updateUser] = useMutation(UPDATE_USER);

    const eliminarUsuario = async (id) => {
        try {
        await deleteUser({ variables: { id } });
        refetchUsuarios(); // actualiza lista
        } catch (error) {
        console.error("Error eliminando usuario:", error);
        }
    };

    const comenzarEdicion = (usuario, index) => {
        setFilaEditando(index);
        setFormulario({
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        edad: usuario.edad,
        intereses: usuario.intereses || [],
        });
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const guardarCambios = async () => {
        try {
        await updateUser({
            variables: {
            data: {
                id: formulario.id,
                nombre: formulario.nombre,
                correo: formulario.correo,
                edad: Number(formulario.edad),
                intereses: formulario.intereses,
            },
            },
        });
        setFilaEditando(null);
        refetchUsuarios();
        } catch (error) {
        console.error("Error actualizando usuario:", error);
        }
    };

    const cancelarEdicion = () => {
        setFilaEditando(null);
        setFormulario({
        id: "",
        nombre: "",
        correo: "",
        edad: 0,
        intereses: [],
        });
    };

    const editarInteres = (index, nuevoValor) => {
        setFormulario((prev) => {
        const nuevos = [...prev.intereses];
        nuevos[index] = nuevoValor;
        return { ...prev, intereses: nuevos };
        });
    };

    const eliminarInteres = (index) => {
        setFormulario((prev) => {
        const nuevos = [...prev.intereses];
        nuevos.splice(index, 1);
        return { ...prev, intereses: nuevos };
        });
    };

    const agregarInteres = () => {
        setFormulario((prev) => ({
        ...prev,
        intereses: [...prev.intereses, ""],
        }));
    };

    return (
        <div className="table-scroll">
        <table className="tabla">
            <thead className="columnas">
            <tr>
                <th className="column-nombre">Nombre</th>
                <th className="column-correo">Correo</th>
                <th className="column-edad">Edad</th>
                <th className="column-acciones">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {usuarios && usuarios.length > 0 ? (
                usuarios.map((usuario, index) => (
                <React.Fragment key={usuario.id}>
                    <tr
                    onClick={() =>
                        setFilaExpandida(filaExpandida === index ? null : index)
                    }
                    style={{ cursor: "pointer" }}
                    >
                    {filaEditando === index ? (
                        <>
                        <td colSpan="4">
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label>Nombre:</label>
                            <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} />

                            <label>Correo:</label>
                            <input type="text" name="correo" value={formulario.correo} onChange={manejarCambio} />

                            <label>Edad:</label>
                            <input type="number" name="edad" value={formulario.edad} onChange={manejarCambio} />

                            <label>Intereses:</label>
                            {formulario.intereses.map((interes, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <input
                                    type="text"
                                    value={interes}
                                    onChange={(e) => editarInteres(i, e.target.value)}
                                />
                                <button onClick={() => eliminarInteres(i)} style={{ color: "red" }}>❌</button>
                                </div>
                            ))}

                            <button onClick={agregarInteres} style={{ marginTop: "5px" }}>➕ Agregar interés</button>

                            <div style={{ marginTop: "10px" }}>
                                <button onClick={guardarCambios}>💾 Guardar</button>
                                <button onClick={cancelarEdicion}>❌ Cancelar</button>
                            </div>
                            </div>
                        </td>
                        </>
                    ) : (
                        <>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.correo}</td>
                        <td>{usuario.edad}</td>
                        <td>
                            <button onClick={(e) => { e.stopPropagation(); eliminarUsuario(usuario.id); }}>
                            ❌
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); comenzarEdicion(usuario, index); }}>
                            ⚙️
                            </button>
                        </td>
                        </>
                    )}
                    </tr>
                    {filaExpandida === index && (
                    <tr>
                        <td colSpan="4">
                        <strong>Intereses:</strong>{" "}
                        {usuario.intereses && usuario.intereses.length > 0
                            ? usuario.intereses.join(", ")
                            : "Sin intereses"}
                        </td>
                    </tr>
                    )}
                </React.Fragment>
                ))
            ) : (
                <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                    No hay datos disponibles
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export default TablaMongo;