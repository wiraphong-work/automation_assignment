def simpleCipher(encrypted, k):
    decrypted = ""
    
    for char in encrypted:
        # 1. หาตำแหน่งปัจจุบันของตัวอักษร (0-25) โดยเทียบจาก 'A'
        current_pos = ord(char) - ord('A')
        
        # 2. คำนวณตำแหน่งใหม่แบบถอยหลัง (ทวนเข็มนาฬิกา)
        # ใช้ % 26 เพื่อให้ตัวเลขวนกลับมาอยู่ในช่วง 0-25 เสมอ
        new_pos = (current_pos - k) % 26
        
        # 3. แปลงตำแหน่งใหม่กลับเป็นตัวอักษร แล้วต่อเข้ากับ string ผลลัพธ์
        decrypted_char = chr(new_pos + ord('A'))
        decrypted += decrypted_char
        
    return decrypted

# --- ส่วนทดสอบตาม Example ในโจทย์ ---
encrypted_text = "VTAOG"
k_value = 2
result = simpleCipher(encrypted_text, k_value)

print(f"Encrypted: {encrypted_text}")
print(f"k: {k_value}")
print(f"Decrypted: {result}") # ได้ 'TRYME'