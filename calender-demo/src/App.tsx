import dayjs from 'dayjs';
import { Calendar } from './calendar';

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs('2024/04/06')}
        dateRender={(value) => {
          return (
            <div>
              <p style={{ background: 'yellowgreen', height: '300px' }}>
                {value.format('YYYY/MM/DD')}
              </p>
            </div>
          );
        }}
      />
    </div>
  );
}

export default App;
