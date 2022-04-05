function parse(str: string): string {
    let result = str.normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "")

    result = result.replaceAll(/[^0-9\\.A-Za-z]+/g, '');

    return result;
}

export default parse