/**
 * 把对象转为formData
 */
export function objToFormData(obj: any) {
    const formData = new FormData()
    Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key])
    })
    return formData
}