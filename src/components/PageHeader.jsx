import backIcon from '../assets/back.svg'

export default function PageHeader({ title, centered = false, onBack, action }) {
  return (
    <header className={`page-header ${centered ? 'page-header--centered' : ''}`}>
      {onBack ? (
        <button className="circle-button page-header__back" type="button" onClick={onBack} aria-label="戻る">
          <img src={backIcon} alt="" />
        </button>
      ) : null}
      <h1>{title}</h1>
      {action ? <div className="page-header__action">{action}</div> : null}
    </header>
  )
}
