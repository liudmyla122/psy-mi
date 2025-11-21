import { Sidebar } from '../../../layout';
import './MBI.css';

export function MBIPage() {
  return (
    <div className="mbi-page">
      <Sidebar />
      <main className="mbi-main">
        <section className="mbi-content">
          <h1 className="mbi-title">Тест MBI</h1>
          <p className="mbi-description">
            Сторінка тесту MBI поки що у розробці. Натисніть на інші активні тести, щоб
            продовжити роботу, або поверніться пізніше.
          </p>
        </section>
      </main>
    </div>
  );
}






