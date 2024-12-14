export const calculateBatchDays = (startDate, endDate, batchType) => {
    if (!startDate || !endDate || !batchType) {
      return "Set Batch Type"
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start > end) {
      throw new Error("startDate must be earlier than endDate.");
    }
  
    let totalDays = 0;
  
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
      if (batchType === "weekdays" && dayOfWeek >= 1 && dayOfWeek <= 5) {
        totalDays++;
      } else if (batchType === "weekends" && (dayOfWeek === 0 || dayOfWeek === 6)) {
        totalDays++;
      }
    }
  
    return totalDays;
  }
  