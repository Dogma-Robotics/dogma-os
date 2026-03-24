'use client'
import { C } from '@/lib/theme'

interface FiltersBarProps {
  columns: { key: string; label: string; type: string }[]
  rows: any[]
  filters: Record<string, string>
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
  sortKey: string
  sortDir: 'asc' | 'desc'
  onSortChange: (key: string) => void
  groupBy: string
  onGroupByChange: (key: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

const FILTER_KEYS = ['status', 'criticality', 'owner'] as const

const selectStyle: React.CSSProperties = {
  background: C.bg2,
  border: `1px solid ${C.bd}`,
  borderRadius: 5,
  color: C.tx,
  fontSize: 12,
  padding: '5px 8px',
  outline: 'none',
  cursor: 'pointer',
  minWidth: 100,
}

const labelStyle: React.CSSProperties = {
  color: C.tx3,
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 2,
}

export default function FiltersBar({
  columns,
  rows,
  filters,
  onFilterChange,
  onClearFilters,
  sortKey,
  sortDir,
  onSortChange,
  groupBy,
  onGroupByChange,
  searchQuery,
  onSearchChange,
}: FiltersBarProps) {
  // Extract unique values for filterable columns
  const uniqueValues = (key: string): string[] => {
    const vals = new Set<string>()
    rows.forEach((r) => {
      const v = r[key]
      if (v != null && v !== '') vals.add(String(v))
    })
    return Array.from(vals).sort()
  }

  const hasActiveFilters =
    searchQuery !== '' ||
    Object.values(filters).some((v) => v !== '') ||
    groupBy !== ''

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        padding: '8px 12px',
        background: C.bg1,
        border: `1px solid ${C.bd}`,
        borderRadius: 8,
        flexWrap: 'wrap',
      }}
    >
      {/* Search */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={labelStyle}>Search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter rows..."
          style={{
            background: C.bg2,
            border: `1px solid ${C.bd}`,
            borderRadius: 5,
            color: C.tx,
            fontSize: 12,
            padding: '5px 8px',
            outline: 'none',
            width: 160,
          }}
        />
      </div>

      {/* Column filters */}
      {FILTER_KEYS.map((key) => {
        const col = columns.find((c) => c.key === key)
        const values = uniqueValues(key)
        if (values.length === 0) return null
        return (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={labelStyle}>{col?.label ?? key}</span>
            <select
              value={filters[key] ?? ''}
              onChange={(e) => onFilterChange(key, e.target.value)}
              style={selectStyle}
            >
              <option value="">All</option>
              {values.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        )
      })}

      {/* Sort */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={labelStyle}>Sort by</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <select value={sortKey} onChange={(e) => onSortChange(e.target.value)} style={selectStyle}>
            <option value="">None</option>
            {columns.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => onSortChange(sortKey)}
            style={{
              background: C.bg2,
              border: `1px solid ${C.bd}`,
              borderRadius: 5,
              color: C.gold,
              fontSize: 12,
              padding: '4px 8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            title={`Currently ${sortDir}`}
          >
            {sortDir === 'asc' ? '\u2191' : '\u2193'}
          </button>
        </div>
      </div>

      {/* Group by */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={labelStyle}>Group by</span>
        <select value={groupBy} onChange={(e) => onGroupByChange(e.target.value)} style={selectStyle}>
          <option value="">None</option>
          <option value="status">Status</option>
          <option value="criticality">Criticality</option>
          <option value="owner">Owner</option>
        </select>
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          style={{
            background: 'transparent',
            border: `1px solid ${C.bd}`,
            borderRadius: 5,
            color: C.gold,
            fontSize: 11,
            padding: '5px 10px',
            cursor: 'pointer',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.bg2)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          Clear all
        </button>
      )}
    </div>
  )
}
