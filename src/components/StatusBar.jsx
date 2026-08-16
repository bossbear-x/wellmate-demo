import statusBar from '../assets/status-bar.svg'

export default function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <img src={statusBar} alt="" />
    </div>
  )
}
