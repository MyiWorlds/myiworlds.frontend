const removePermissionDenied = circles => {
  return circles.filter(circle => circle.type !== 'PERMISSION_DENIED');
};

export default removePermissionDenied;
