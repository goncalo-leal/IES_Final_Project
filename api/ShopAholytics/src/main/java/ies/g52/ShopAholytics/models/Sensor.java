package ies.g52.ShopAholytics.models;


import java.time.LocalTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "sensor")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

    @OneToOne(mappedBy = "sensor")
    @JsonIgnore
    @PrimaryKeyJoinColumn
    private SensorShopping sensorShopping;

    @OneToOne(mappedBy = "sensor")
    @JsonIgnore
    @PrimaryKeyJoinColumn
    private SensorPark sensorPark;

    @OneToOne(mappedBy = "sensor")
    @JsonIgnore
    @PrimaryKeyJoinColumn
    private SensorStore sensorStore;

    @OneToMany(mappedBy = "sensor")
    @JsonIgnore
    private Set<SensorData> sensorData;

    public Sensor() {
    }
    public Sensor(String type,String name){
        this.type=type;
        this.name=name;
    }


    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }
   
   
    public String getType(){
        return this.type;
    }

    public int getId() {
        return id;
    }


    public void setType(String type){
        this.type=type;
    }


    public SensorShopping getSensorShopping() {
        return this.sensorShopping;
    }

    public SensorPark getSensorPark() {
        return this.sensorPark;
    }

    public SensorStore getSensorStore() {
        return this.sensorStore;
    }


    
}   

