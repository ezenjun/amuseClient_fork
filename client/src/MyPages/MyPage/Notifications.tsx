import React from 'react'
import NotificationsTable from '../GroupingTable/NotificationsTable'

export default function Notifications() {
  return (
    <div>
      <h2 style={{marginBottom: "25px"}}>알림 리스트</h2>
      <NotificationsTable />
    </div>
  )
}
