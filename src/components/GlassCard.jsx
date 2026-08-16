export default function GlassCard({ className = '', as: Tag = 'div', children, ...props }) {
  return (
    <Tag className={`glass-card ${className}`} {...props}>
      {children}
    </Tag>
  )
}
