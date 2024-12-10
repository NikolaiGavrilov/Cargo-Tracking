import { useState } from "react";
import "./CargoTable.scss";

interface Cargo {
  id: string;
  name: string;
  status: string;
  origin: string;
  destination: string;
  departureDate: string;
}

interface CargoTableProps {
  cargoList: Cargo[];
  handleStatusChange: (id: string, status: string) => void;
}

const CargoTable: React.FC<CargoTableProps> = ({
  cargoList,
  handleStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("Все");

  const filteredCargoList =
    selectedStatus === "Все"
      ? cargoList
      : cargoList.filter((cargo) => cargo.status === selectedStatus);

  return (
    <div className="table-responsive">
      <h2 className="h2">Отслеживание грузов</h2>
      <select
        className="form-select form-select-sm cargo-table__filter-select"
        onChange={(e) => setSelectedStatus(e.target.value)}
        value={selectedStatus}
      >
        <option value="Все">Все</option>
        <option value="Ожидает отправки">Ожидает отправки</option>
        <option value="В пути">В пути</option>
        <option value="Доставлен">Доставлен</option>
      </select>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID груза</th>
            <th>Название груза</th>
            <th>Текущий статус</th>
            <th>Откуда</th>
            <th>Куда</th>
            <th>Дата отправления</th>
            <th>Изменение статуса</th>
          </tr>
        </thead>
        <tbody>
          {filteredCargoList.map((cargo) => (
            <tr key={cargo.id}>
              <td>{cargo.id}</td>
              <td>{cargo.name}</td>
              <td
                className={
                  cargo.status === "Ожидает отправки"
                    ? "text-warning"
                    : cargo.status === "В пути"
                    ? "text-primary"
                    : "text-success"
                }
              >
                {cargo.status}
              </td>
              <td>{cargo.origin}</td>
              <td>{cargo.destination}</td>
              <td>{cargo.departureDate}</td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(cargo.id, e.target.value)}
                  value={cargo.status}
                >
                  <option value="Ожидает отправки">Ожидает отправки</option>
                  <option value="В пути">В пути</option>
                  <option value="Доставлен">Доставлен</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;
