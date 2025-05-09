using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Users> Users { get; set; }

    }
}