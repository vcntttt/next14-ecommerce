import "./loading.css";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader">
        <div className="square" id="sq1"></div>
        <div className="square" id="sq2"></div>
        <div className="square" id="sq3"></div>
        <div className="square" id="sq4"></div>
        <div className="square" id="sq5"></div>
        <div className="square" id="sq6"></div>
        <div className="square" id="sq7"></div>
        <div className="square" id="sq8"></div>
        <div className="square" id="sq9"></div>
      </div>
      {/* <p>Estamos cargando los productos... (y alguna que otra cosa)</p> */}
    </div>
  );
}
