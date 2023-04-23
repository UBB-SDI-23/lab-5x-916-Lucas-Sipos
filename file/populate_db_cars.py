if __name__ == '__main__':
    from faker import Faker
    import random

    model = []
    with open("/home/lucas/ubumbu/university/UNI/Semester 4/SDI/lab-5x-916-Lucas-Sipos/model.txt", "r") as file:
        while True:
            line = file.readline().strip()
            if line == "":
                break
            model.append(line)

    fake = Faker()
    n = 1000
    times = 1000
    transmission_type = ["M", "A", "C"]
    fuel_type = ["G", "D", "BD", "E"]
    file_name = "car_"
    file_ext = ".sql"

    header = "INSERT INTO application_car (MODEL, YEAR, FUEL_TYPE, CC, HP, TRANSMISSION_TYPE) VALUES"
    for j in range(times):
        with open(
                f"/home/lucas/ubumbu/university/UNI/Semester 4/SDI/lab-5x-916-Lucas-Sipos/file/cars/{file_name}{j}{file_ext}",
                "w") as file:
            print(header, file=file)
            for i in range(n):
                if i != n - 1:
                    print(
                        f"('{random.choice(model)}',{fake.year()},'{random.choice(fuel_type)}','{round(random.uniform(0.0, 9.9), 1)}','{random.randrange(80, 1200)}','{random.choice(transmission_type)}'),",
                        file=file)
                else:
                    print(
                        f"('{random.choice(model)}',{fake.year()},'{random.choice(fuel_type)}','{round(random.uniform(0.0, 9.9), 1)}','{random.randrange(80, 1200)}','{random.choice(transmission_type)}')",
                        file=file)
        print(f"{j + 1}/{times}")
