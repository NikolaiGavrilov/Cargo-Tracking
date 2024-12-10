import "./AddNewCargo.scss";

interface Cargo {
  name: string;
  origin: string;
  destination: string;
  departureDate: string;
  status: string;
}

interface AddNewCargoProps {
  newCargo: Cargo;
  setNewCargo: (cargo: Cargo) => void;
  handleAddCargo: () => void;
}

const cities = [
  "Архангельск",
  "Барнаул",
  "Волгоград",
  "Воронеж",
  "Екатеринбург",
  "Ижевск",
  "Казань",
  "Калининград",
  "Кемерово",
  "Краснодар",
  "Красноярск",
  "Москва",
  "Набережные Челны",
  "Нижний Новгород",
  "Новосибирск",
  "Омск",
  "Пермь",
  "Ростов-на-Дону",
  "Самара",
  "Саратов",
  "Санкт-Петербург",
  "Ставрополь",
  "Тула",
  "Тюмень",
  "Уфа",
  "Челябинск",
  "Ярославль",
];

const AddNewCargo = ({
  newCargo,
  setNewCargo,
  handleAddCargo,
}: AddNewCargoProps) => {
  return (
    <>
      <h2 className="h2">Добавить новый груз</h2>
      <div className="add-new-cargo">
        <input
          className="form-control add-new-cargo__elem"
          type="text"
          placeholder="Название груза"
          maxLength={50}
          value={newCargo.name}
          onChange={(e) => setNewCargo({ ...newCargo, name: e.target.value })}
        />

        <select
          className="form-select form-select-sm add-new-cargo__elem"
          value={newCargo.origin}
          onChange={(e) => setNewCargo({ ...newCargo, origin: e.target.value })}
        >
          <option value="" disabled>
            Пункт отправления
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          className="form-select form-select-sm add-new-cargo__elem"
          value={newCargo.destination}
          onChange={(e) =>
            setNewCargo({ ...newCargo, destination: e.target.value })
          }
        >
          <option value="" disabled>
            Пункт назначения
          </option>
          {cities
            .filter((city) => city !== newCargo.origin)
            .map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        <input
          className="form-control add-new-cargo__elem"
          type="date"
          value={newCargo.departureDate}
          onChange={(e) =>
            setNewCargo({ ...newCargo, departureDate: e.target.value })
          }
        />

        <button
          className="btn btn-light add-new-cargo__elem"
          onClick={handleAddCargo}
        >
          Добавить груз
        </button>
      </div>
    </>
  );
};

export default AddNewCargo;
