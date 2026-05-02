
export const generateGoogleCalendarLink = (booking: any) => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const title = encodeURIComponent(`${booking.pujaType} - Shri Nar Narayan`);
  
  // Parse time if it exists in the label like "Brahma Muhurat (4 AM - 6 AM)"
  let startHour = 9; // default 9 AM
  if (booking.time) {
    const timeMatch = booking.time.match(/(\d+)\s*(AM|PM)/i);
    if (timeMatch) {
      startHour = parseInt(timeMatch[1]);
      const ampm = timeMatch[2].toUpperCase();
      if (ampm === 'PM' && startHour < 12) startHour += 12;
      if (ampm === 'AM' && startHour === 12) startHour = 0;
    }
  }

  // Format dates: YYYYMMDDTHHMMSSZ
  const startDate = new Date(booking.date);
  startDate.setHours(startHour, 0, 0, 0);
  
  // Use local time for conversion to UTC ISO string
  const startStr = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  // End date is 2 hours after start
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  const details = encodeURIComponent(`Religious service booking at Shri Nar Narayan.\nService: ${booking.pujaType}\nTime Slot: ${booking.time || 'As specified'}\nNote: ${booking.message || ''}`);
  const location = encodeURIComponent(booking.location || 'Kathmandu, Nepal');

  return `${baseUrl}&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
};

export const downloadICal = (booking: any) => {
  const title = `${booking.pujaType} - Shri Nar Narayan`;
  
  let startHour = 9;
  if (booking.time) {
    const timeMatch = booking.time.match(/(\d+)\s*(AM|PM)/i);
    if (timeMatch) {
      startHour = parseInt(timeMatch[1]);
      const ampm = timeMatch[2].toUpperCase();
      if (ampm === 'PM' && startHour < 12) startHour += 12;
      if (ampm === 'AM' && startHour === 12) startHour = 0;
    }
  }

  const startDate = new Date(booking.date);
  startDate.setHours(startHour, 0, 0, 0);
  const startStr = startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shri Nar Narayan//Religious Services//EN',
    'BEGIN:VEVENT',
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:Religious service booking at Shri Nar Narayan.\\nService: ${booking.pujaType}\\nTime Slot: ${booking.time || 'As specified'}\\nNote: ${booking.message || ''}`,
    `LOCATION:${booking.location || 'Kathmandu, Nepal'}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `shri-nar-narayan-${booking.pujaType.replace(/\s+/g, '-').toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
