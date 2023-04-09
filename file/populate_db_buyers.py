if __name__ == '__main__':
    from faker import Faker
    import random

    fake = Faker()
    n = 1000
    times = 1000
    sex = ["M", "F", "N"]
    file_name = "buyer_"
    file_ext = ".sql"
    header = "INSERT INTO application_buyer (first_name, last_name, age, sex, car_id) VALUES"
    for j in range(times):
        with open(f"/home/lucas/ubumbu/university/UNI/Semester 4/SDI/lab-5x-916-Lucas-Sipos/file/buyers/{file_name}{j}{file_ext}", "w") as file:
            print(header, file=file)
            for i in range(n):
                if i != n - 1:
                    print(
                        f"('{fake.first_name()}','{fake.last_name()}',{random.randrange(16,81)},'{random.choice(sex)}',{random.randrange(1,1_000_001)}),",
                        file=file)
                else:
                    print(
                        f"('{fake.first_name()}','{fake.last_name()}',{random.randrange(16, 81)},'{random.choice(sex)}',{random.randrange(1, 1_000_001)})",
                        file=file)
        print(f"{j+1}/{times}")
