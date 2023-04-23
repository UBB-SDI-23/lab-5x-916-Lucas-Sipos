if __name__ == '__main__':
    from faker import Faker
    import random

    fake = Faker()
    n = 1000
    times = 1000
    file_name = "company_"
    file_ext = ".sql"
    header = "INSERT INTO application_company (name, owner, number_of_employees) VALUES"
    for j in range(times):
        with open(f"/home/lucas/ubumbu/university/UNI/Semester 4/SDI/lab-5x-916-Lucas-Sipos/file/company/{file_name}{j}{file_ext}", "w") as file:
            print(header, file=file)
            for i in range(n):
                if i != n - 1:
                    print(
                        f"('{fake.company()}','{fake.name()}',{random.randrange(10, 30000)}),",
                        file=file)
                else:
                    print(
                        f"('{fake.company()}','{fake.name()}',{random.randrange(10, 30000)})",
                        file=file)
        print(f"{j+1}/{times}")
