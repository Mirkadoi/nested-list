/**
 * Функция генерирует уникальные ID
 *
 * @name generateID
 *
 * @return {string} получаемый ID в виде строки
 */

export default function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};
