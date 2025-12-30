import { useState, useMemo, useRef } from "react";

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\";

function App() {
  //campi controllati
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  //campi non controllati => useRef
  const fullNameRef = useRef();
  const specRef = useRef();
  const expRef = useRef();

  const userNameValidation = useMemo(() => {
    if (!userName) return null;
    //solo alfanumerici, almeno 6 caratteri, no spazi o simboli
    const validChars = userName
      .split("")
      // * validChars = [...userName].every(char=>etc) facendo lo spread di userName posso ottenere tutti i caratteri
      .every((char) => letters.includes(char) || numbers.includes(char));
    return validChars && userName.trim().length >= 6;
  }, [userName]);

  const passwordValidation = useMemo(() => {
    //deve contenere 1 numero, 1 simbolo, 1 lettera, 8 caratteri
    return (
      password.trim().length >= 8 &&
      password.split("").some((char) => letters.includes(char)) &&
      password.split("").some((char) => numbers.includes(char)) &&
      password.split("").some((char) => symbols.includes(char))
    );
  }, [password]);

  const bioValidation = useMemo(() => {
    //tra i 100 e i 1000 caratteri
    return bio.trim().length >= 100 && bio.trim().length <= 1000;
  }, [bio]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //valori non controllati
    const fullName = fullNameRef.current.value;
    const specializzazione = specRef.current.value;
    const experience = expRef.current.value;

    if (
      !fullName.trim() ||
      !userName.trim() ||
      !password.trim() ||
      !specializzazione.trim() ||
      !experience ||
      experience <= 0 ||
      !bio.trim() ||
      // submit validation
      !userNameValidation ||
      !passwordValidation ||
      !bioValidation
    ) {
      alert("Errore: Compilare tutti i campi");
      return;
    }
    console.log("Form Compilato correttamente", {
      fullName,
      userName,
      password,
      specializzazione,
      experience,
      bio,
    });
    //personal bonus - reset del form, i campi non controllati non sono più funzioni e gli si assegna una stringa vuota.
    fullNameRef.current.value = "";
    setUserName("");
    setPassword("");
    specRef.current.value = "";
    expRef.current.value = "";
    setBio("");
    alert("Form Compilato!");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="p-3">Web Developer Signup</h1>
      <form className="w-50 border p-4 shadow rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="FullName" className="form-label">
            Nome completo
          </label>
          <input
            type="text"
            className="form-control"
            id="FullName"
            placeholder="Inserisci il tuo nome"
            ref={fullNameRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Inserisci il tuo username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userName.trim() && (
            <p style={{ color: userNameValidation ? "green" : "red" }}>
              {userNameValidation
                ? "Username valido"
                : "Deve avere almeno 6 caratteri"}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: passwordValidation ? "green" : "red" }}>
              {passwordValidation
                ? "Password Valida"
                : "Deve avere almeno 8 caratteri, 1 numero, 1 simbolo e 1 lettera."}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="Spec" className="form-label">
            Scegli la tua specializzazione
          </label>
          <select
            name="Specialization"
            id="Spec"
            className="form-label m-2"
            ref={specRef}
          >
            <option value="">Seleziona...</option>
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="Experience" className="form-label">
            Anni di Esperienza
          </label>
          <input
            type="number"
            id="Experience"
            className="form-control"
            placeholder="Write a number"
            ref={expRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sml-bio" className="form-label">
            Breve descrizione sullo sviluppatore
          </label>
          <textarea
            type="text-area"
            className="form-control"
            id="sml-bio"
            placeholder="Scrivi una breve descrizione"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {bio.trim() && (
            <p style={{ color: bioValidation ? "green" : "red" }}>
              {bioValidation
                ? "Descrizione valida"
                : `Deve avere tra 100 e 1000 caratteri.  Actual length: ${
                    bio.trim().length
                  }`}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default App;
