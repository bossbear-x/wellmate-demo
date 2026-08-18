import { useRef, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import avatar from '../assets/avatar.png'

export default function ProfileEditPage({ initialProfile, onBack, onSave }) {
  const [form, setForm] = useState(initialProfile)
  const photoInput = useRef(null)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const changePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update('avatar', reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <>
      <PageHeader title="プロフィール編集" centered onBack={onBack} action={<button className="text-action" type="button" onClick={() => onSave(form)}>保存</button>} />
      <section className="screen-scroll profile-edit-scroll" aria-label="プロフィール編集">
        <div className="profile-edit-avatar">
          <img src={form.avatar || avatar} alt={form.name} />
          <input ref={photoInput} type="file" accept="image/*" onChange={changePhoto} />
          <button type="button" onClick={() => photoInput.current?.click()}>写真を変更</button>
        </div>

        <div className="profile-edit-fields">
          <label><span>名前</span><input value={form.name} onChange={(event) => update('name', event.target.value)} /></label>
          <label><span>生年月日</span><input type="date" value={form.birthday} onChange={(event) => update('birthday', event.target.value)} /></label>
          <label><span>身長</span><span className="profile-edit-number"><input inputMode="decimal" value={form.height} onChange={(event) => update('height', event.target.value)} /><b>cm</b></span></label>
          <label><span>目標体重</span><span className="profile-edit-number"><input inputMode="decimal" value={form.targetWeight} onChange={(event) => update('targetWeight', event.target.value)} /><b>kg</b></span></label>
        </div>

        <h2>アプリ設定</h2>
        <GlassCard className="profile-edit-setting"><span><strong>通知設定</strong><small>リマインダーとお知らせ</small></span><button className={`toggle-switch ${form.notifications ? 'is-active' : ''}`} type="button" role="switch" aria-checked={form.notifications} onClick={() => update('notifications', !form.notifications)}><i /></button></GlassCard>
        <GlassCard className="profile-edit-setting"><span><strong>データ連携</strong><small>ヘルスケアデータを同期</small></span><button className={`toggle-switch ${form.dataLink ? 'is-active' : ''}`} type="button" role="switch" aria-checked={form.dataLink} onClick={() => update('dataLink', !form.dataLink)}><i /></button></GlassCard>

      </section>
    </>
  )
}
