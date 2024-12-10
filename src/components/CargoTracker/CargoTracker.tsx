import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CargoTracker.scss";
import CargoTable from "../CargoTable/CargoTable";
import AddNewCargo from "../AddNewCargo/AddNewCargo";

const initialCargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24",
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26",
  },
];

const CargoTracker = () => {
  const [cargoList, setCargoList] = useState(initialCargoList);
  const [newCargo, setNewCargo] = useState({
    name: "",
    origin: "",
    destination: "",
    departureDate: "",
    status: "Ожидает отправки",
  });

  const handleAddCargo = () => {
    if (
      !newCargo.name ||
      !newCargo.origin ||
      !newCargo.destination ||
      !newCargo.departureDate
    ) {
      alert("Заполните все поля, чтобы мы могли отправить груз.");
      return;
    }

    const newCargoItem = {
      ...newCargo,
      id: `CARGO${(cargoList.length + 1).toString().padStart(3, "0")}`,
    };
    setCargoList([...cargoList, newCargoItem]);
    setNewCargo({
      name: "",
      origin: "",
      destination: "",
      departureDate: "",
      status: "Ожидает отправки",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    const currentDate = new Date();
    const thisCargo = cargoList.find((c) => c.id === id);

    if (!thisCargo) {
      alert("Груз не найден.");
      return;
    }

    if (status === "Доставлен" || status === "В пути") {
      if (new Date(thisCargo.departureDate) > currentDate) {
        alert(
          "Невозможно установить данный статус. Дата отправления еще не наступила. Немного терпения, и заказ к вам приедет."
        );
        return;
      }
    }

    const updatedCargoList = cargoList.map((cargo) =>
      cargo.id === id ? { ...cargo, status } : cargo
    );
    setCargoList(updatedCargoList);
  };

  return (
    <div className="cargo-tracker">
      <div className="container ">
        <h1 className="h1">Cargo Tracker</h1>
        <br />
        <CargoTable
          cargoList={cargoList}
          handleStatusChange={handleStatusChange}
        />
        <AddNewCargo
          newCargo={newCargo}
          setNewCargo={setNewCargo}
          handleAddCargo={handleAddCargo}
        />
      </div>
    </div>
  );
};

export default CargoTracker;
