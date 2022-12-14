import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ModalWindowOk from "../atoms/molecules/ModalWindowOk";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isEmail } from "../../Helpers/helpers.js";
import { createUsers } from "../../services/serviceUsers";

export default function ModalFormCreateUser({ isUpDate, setIsUpDate, rol }) {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  function createUser(values) {
    const data = {};
    data.name = values.user_name;
    data.username = values.user_last_name;
    data.email = values.user_email;
    if (rol === "user") {
      data.roles = ["user"];
    } else if (rol === "admin") {
      data.roles = ["admin"];
    }

    createUsers(auth.accesToken, data)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setIsUpDate(!isUpDate);
        ModalWindowOk("Guardado Exitoso");
      })
      .catch((err) => {
        console.log(err);
        ModalWindowOk("No se pudo Guardar el Registro", (icon = "error"));
      });
  }

  return (
    <>
      <button
        className="btn-yellow"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Crear Usuario
      </button>
      {showModal ? (
        <>
          <Formik
            initialValues={{
              user_email: "",
              user_name: "",
              user_last_name: "",
            }}
            validate={(values) => {
              let errors = {};
              if (!values.user_email) {
                errors.user_email = "Ingrese un correo electronico.";
              } else if (!isEmail(values.user_email)) {
                errors.user_email =
                  "El correo solo puede contener letras, puntos y _.";
              }
              if (!values.user_name) {
                errors.user_name = "Ingrese un nombre de usuario.";
              }
              if (!values.user_last_name) {
                errors.user_last_name = "Ingrese un nombre completo.";
              }
              return errors;
            }}
            onSubmit={(values) => {
              createUser(values);
            }}
          >
            {({ errors }) => (
              <Form>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray outline-none focus:outline-none">
                      <div className="text-colortitle font-paragraph flex items-start justify-between p-5 ">
                        <h3 className="text-3xl font-semibold text-yellow">
                          {rol === "user"
                            ? "Crear Usuario"
                            : "Crear Administrador"}
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        {/* aqui iria el form  */}
                        <div className="mb-6">
                          <label className="block mb-2 font-title text-sm text-white font-semibold">
                            Usuario
                          </label>
                          <Field
                            type="text"
                            name="user_name"
                            placeholder="Usuario"
                            className="font-title w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-red dark:bg-bglight dark:text-colorparagraph dark:placeholder-gray-500 dark:border-red dark:focus:ring-red dark:focus:border-red"
                          />
                          <ErrorMessage
                            name="user_name"
                            component={() => (
                              <div className="text-yellow text-sm">
                                {errors.user_name}
                              </div>
                            )}
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 font-title text-sm text-white font-semibold">
                            Nombre Completo
                          </label>
                          <Field
                            type="text"
                            name="user_last_name"
                            placeholder="Nombre"
                            className="font-title w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-red dark:bg-bglight dark:text-colorparagraph dark:placeholder-gray-500 dark:border-red dark:focus:ring-red dark:focus:border-red"
                          />
                          <ErrorMessage
                            name="user_last_name"
                            component={() => (
                              <div className="text-yellow text-sm">
                                {errors.user_last_name}
                              </div>
                            )}
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 font-title text-sm text-white font-semibold">
                            Email Address
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="user_email"
                            placeholder="you@company.com"
                            className="font-title w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-bglight dark:text-colorparagraph dark:placeholder-gray-500 dark:border-red dark:focus:ring-red dark:focus:border-red"
                          />
                          <ErrorMessage
                            name="user_email"
                            component={() => (
                              <div className="text-yellow text-sm">
                                {errors.user_email}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="text-colortitle font-paragraph flex items-start justify-between p-5">
                        <button
                          className="ModalWindowOk text-yellow background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Cerrar
                        </button>
                        <button className="btn-yellow" type="submit">
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="opacity-25 fixed inset-0 z-40 bg-dark"></div>
        </>
      ) : null}
    </>
  );
}
